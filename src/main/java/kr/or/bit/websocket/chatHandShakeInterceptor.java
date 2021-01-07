package kr.or.bit.websocket;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.support.HttpSessionHandshakeInterceptor;


public class chatHandShakeInterceptor extends HttpSessionHandshakeInterceptor{
	  
    @Override
    public boolean beforeHandshake(ServerHttpRequest request,
            ServerHttpResponse response, WebSocketHandler wsHandler,
            Map<String, Object> attributes) throws Exception {
    	
    	ServletServerHttpRequest ssreq = (ServletServerHttpRequest) request;
    	HttpServletRequest req= ssreq.getServletRequest();
        System.out.println("Before Handshake");
        System.out.println("select: " + req.getParameter("select"));
        System.out.println("roomname: " + req.getParameter("roomname"));
        System.out.println("nickname: " + req.getSession().getAttribute("nick"));
        System.out.println("loginuser: " + req.getSession().getAttribute("loginuser"));
       
        // 파라미터로 입력된 attributes에 put을 하면 
        // WebSocketSession에 자동으로 저장되어 Chat class에서 활용 가능
        attributes.put("select", req.getParameter("select"));
        attributes.put("roomname", req.getParameter("roomname"));
        attributes.put("nick", req.getSession().getAttribute("nick"));
        attributes.put("loginuser", req.getSession().getAttribute("loginuser"));
        return super.beforeHandshake(request, response, wsHandler, attributes);
    }
  
    @Override
    public void afterHandshake(ServerHttpRequest request,
            ServerHttpResponse response, WebSocketHandler wsHandler,
            Exception ex) {
        System.out.println("After Handshake");
  
        super.afterHandshake(request, response, wsHandler, ex);
    }
  
}
