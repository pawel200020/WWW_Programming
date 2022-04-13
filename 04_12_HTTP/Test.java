import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

public class Test {

  public static Map<String, String> queryToMap(String query) {
    if (query == null) {
      return null;
    }
    Map<String, String> result = new HashMap<>();
    for (String param : query.split("&")) {
      String[] entry = param.split("=");
      if (entry.length > 1) {
        result.put(entry[0], entry[1]);
      } else {
        result.put(entry[0], "");
      }
    }

    return result;
  }

  public static void addPostsFromFile(List<String> textfile, StringBuilder response) {
    for (var item : textfile) {
      var query = queryToMap(item);
      for (Map.Entry<String, String> entry : query.entrySet()) {
        if (!entry.getKey().equals("data")) {
          response.append(entry.getKey() + " : " + entry.getValue() + "<br>");
        } else {
          var t = entry.getValue();
          StringBuilder a = new StringBuilder();
          for (var ta : t.toCharArray()) {
            if (ta == '+') {
              a.append(" ");
            } else {
              a.append(ta);
            }
          }
          response.append(a + "<br>");
        }
      }
    }
  }

  public static void main(String[] args) throws Exception {
    System.out.println("Starting Java Web Server");
    try {
      HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);
      server.createContext("/test", new MyHandler());
      server.setExecutor(null); // creates a default executor
      server.start();
    } catch (Exception ex) {
      System.out.println("Unexpected error occurred");
      ex.getStackTrace();
      throw new Exception(ex);

    }
    System.out.println("Server started successfully");

  }

  static class MyHandler implements HttpHandler {
    @Override
    public void handle(HttpExchange t) {

      StringBuilder response = new StringBuilder(
          "<html>" +
              "<b>" +
              "<b>some code" +
              "<form action=\"\" method=\"get\">" +
              "<input type=\"text\" id=\"nick\" name=\"nick\"><br><br>" +
              "<textarea type=\"text\" id=\"data\" name=\"data\" style=\"width: 400px; height: 100px;\"></textarea><br><br>"
              +
              "<input type=\"submit\" value=\"Submit\">" +
              "</form>" + "<br>" + "<br>" + "<br>" + "<br>" + "<br>");

      try {
        File file = new File("fileName.txt");
        if (!file.exists()) {
          file.createNewFile();
        }
        BufferedWriter writer = new BufferedWriter(new FileWriter("fileName.txt", true));
        BufferedReader reader = new BufferedReader(new FileReader("fileName.txt"));
        String a = new String();
        if (!(t.getRequestURI().getQuery() == null)) {
          a = t.getRequestURI().getQuery();
          if (!a.isEmpty()) {
            writer.write(a);
            writer.write("\n");
            addPostsFromFile(Arrays.asList(a), response);
          }
        }
        String readerString;
        List<String> textfile = new ArrayList<String>();
        while ((readerString = reader.readLine()) != null) {
          textfile.add(readerString);
        }

        Collections.reverse(textfile);

        addPostsFromFile(textfile, response);
        response.append("</html>");

        t.sendResponseHeaders(200, response.length());
        OutputStream os = t.getResponseBody();
        os.write(response.toString().getBytes());
        System.out.println(LocalDateTime.now() + " client has recently loaded this page");

        os.close();
        writer.close();
        reader.close();
      } catch (Exception ex) {
        System.out.println("unhandled exception");
        ex.getStackTrace();
      }

    }
  }
}
