package com.test.admin.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author zhangyuxi, {@literal <yuxi.zhang@leyantech.com>}
 * @date 2022-07-02
 */

@Controller
public class LoginController {


  @RequestMapping("/login")
  public String login() {
    return "login";
  }
}
