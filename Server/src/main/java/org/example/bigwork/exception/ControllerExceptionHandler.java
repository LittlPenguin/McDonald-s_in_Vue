//异常处理类
package org.example.bigwork.exception;


import org.example.bigwork.response.Response;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ControllerExceptionHandler {

    @ExceptionHandler(Exception.class)
    public Response handleException(Exception e) {
        e.printStackTrace();
        return Response.fail(e.getMessage());
    }

}
