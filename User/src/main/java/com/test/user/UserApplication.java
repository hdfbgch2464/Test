package com.test.user;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.net.InetAddress;
import java.net.UnknownHostException;

/**
 * @author zhangyuxi, {@literal <zhangyuxi@leyantech.com>}
 * @date 2022-05-25.
 */
@SpringBootApplication
@MapperScan("com.test.user.mapper")
public class UserApplication {

  public static void main(String[] args) {
    SpringApplication.run(UserApplication.class, args);
  }
}
