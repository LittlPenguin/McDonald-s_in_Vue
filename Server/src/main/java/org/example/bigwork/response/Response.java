package org.example.bigwork.response;

import lombok.Getter;

@Getter
public class Response<T> {
    private Integer code;
    private String message;
    private T data;

    //构造方法
    private Response(Integer code){
        this.code=code;
    }
    private Response(Integer code,String message){
        this.code=code;
        this.message=message;
    }
    private Response(Integer code,String message,T data){
        this.code=code;
        this.message=message;
        this.data=data;
    }

    //成功响应
    public static <T> Response<T> success(){
        return new Response<>(ResponseCode.SUCCESS.getCode());
    }
    public static <T> Response<T> success(String message){
        return new Response<>(ResponseCode.SUCCESS.getCode(),message);
    }
    public static <T> Response<T> data(T data){
        return new Response<>(ResponseCode.SUCCESS.getCode(),ResponseCode.SUCCESS.getMessage(),data);
    }
    //失败响应
    public static <T> Response<T> fail(){
        return new Response<>(ResponseCode.ERROR.getCode(),ResponseCode.ERROR.getMessage());
    }
    public static <T> Response<T> fail(String message){
        return new Response<>(ResponseCode.ERROR.getCode(),message);
    }
    public static <T> Response<T> fail(ResponseCode ResponseCode){
        return new Response<>(ResponseCode.getCode(),ResponseCode.getMessage());
    }
    public static <T> Response<T> fail(Integer code,String message){
        return new Response<>(code,message);
    }
}
