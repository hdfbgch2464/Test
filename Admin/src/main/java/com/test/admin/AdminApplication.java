package com.test.admin;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * @author zhangyuxi, {@literal <yuxi.zhang@leyantech.com>}
 * @date 2022-07-02
 */
@SpringBootApplication
@MapperScan("com.test.admin.mapper")
public class AdminApplication {

  public static void main(String[] args) {
    SpringApplication.run(AdminApplication.class, args);
  }

}
