package org.example.bigwork;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
//扫描接口
@MapperScan("org.example.bigwork.mapper")
@SpringBootApplication
public class BigWorkApplication {
    public static void main(String[] args) {
        SpringApplication.run(BigWorkApplication.class, args);
    }
}
