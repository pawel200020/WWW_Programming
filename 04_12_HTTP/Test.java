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

  public static StringBuilder plusToSpace(String variable, int NumSpaces){
    StringBuilder a = new StringBuilder();
    for (var ta : variable.toCharArray()) {
      if (ta == '+') {
        for(int i = 0; i < NumSpaces; i++){
          a.append(" ");
        }
      } else {
        a.append(ta);
      }
    }
    return a;
  }
  public static void addPostsFromFile(List<String> textfile, StringBuilder response) {
    for (var item : textfile) {
      var query = queryToMap(item);
      for (Map.Entry<String, String> entry : query.entrySet()) {
        if (entry.getKey().equals("nick")) {
          var t = entry.getValue();
          StringBuilder a = plusToSpace(t, 1);
          response.append("<div id=\"ans\">" + "\n" + "<p id =\"nickString\">" + entry.getKey()
              + "</p>: <h3 id =\"nick2\"> " + a + "</h3><hr>");
        } else if (entry.getKey().equals("data")) {
          response.append("<p>");
          var t = entry.getValue();
          StringBuilder a = plusToSpace(t, 1);
          response.append(a + "</p></div>" + "<br>");
        } else if (entry.getKey().equals("date")) {
          response.append("<p>");
          var t = entry.getValue();
          StringBuilder a = plusToSpace(t, 5);
          response.append(a + "</p>");
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
      var date = LocalDateTime.now();
      var minute = new StringBuilder();
      if(date.getMinute()<10){
        minute.append("0"+date.getMinute());
      } else{
        minute.append(date.getMinute());
      }
      var currTime = date.getHour()+":"+minute+"+"+date.getDayOfMonth()+"."+date.getMonthValue()+"."+date.getYear();
      StringBuilder response = new StringBuilder();
      try {
        File file2 = new File("index.html");
        if (!file2.exists()) {
          file2.createNewFile();
        }
        BufferedReader r1 = new BufferedReader(new FileReader("index.html"));
        String rz;
        while ((rz = r1.readLine()) != null) {
          response.append(rz);
        }
        r1.close();
      } catch (Exception ex) {
        ex.printStackTrace();
      }

      try {
        File file = new File("fileName.txt");
        if (!file.exists()) {
          file.createNewFile();
        }
        BufferedWriter writer = new BufferedWriter(new FileWriter("fileName.txt", true));
        BufferedReader reader = new BufferedReader(new FileReader("fileName.txt"));
        String a = new String();
        if ((!(t.getRequestURI().getQuery() == null))&&!(t.getRequestURI().getQuery().contains("nick=&data="))&&!(t.getRequestURI().getQuery().isEmpty())) {
          a = t.getRequestURI().getQuery();
          a += "&date=" + currTime;
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
