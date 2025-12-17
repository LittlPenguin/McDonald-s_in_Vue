package org.example.bigwork.controller;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


//测试接口转发Controller
@RestController
public class TestController {
    //URL注解
    @RequestMapping("/hellod")
    //参数注解
    public String sayHello(@RequestParam String name){
        //localhost:8080/hello?name=张三
        return "Hello World"+name;
    }
}
