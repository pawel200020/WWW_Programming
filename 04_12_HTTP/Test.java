import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

public class Test {

  public Map<String, String> queryToMap(String query) {
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
    public void handle(HttpExchange t) throws IOException {

      BufferedWriter writer = new BufferedWriter(new FileWriter("fileName.txt"));
      String a = t.getRequestURI().getQuery();
      writer.append(a);
      String response = "<html>" +
          "<b>" +
          "<b>some code" +
          "<form action=\"\" method=\"post\">" +
          "<label for=\"fname\">First name:</label>" +
          "<input type=\"text\" id=\"fname\" name=\"fname\"><br><br>" +
          "<label for=\"lname\">Last name:</label>" +
          "<input type=\"text\" id=\"lname\" name=\"lname\"><br><br>" +
          "<input type=\"submit\" value=\"Submit\">" +
          "</form>" +
          a +
          "</html>";

      t.sendResponseHeaders(200, response.length());
      OutputStream os = t.getResponseBody();
      os.write(response.getBytes());
      System.out.println(LocalDateTime.now() + " client has recently loaded this page");
      os.close();
      writer.close();
    }
  }
}
