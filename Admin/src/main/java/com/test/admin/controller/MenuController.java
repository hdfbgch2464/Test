package com.test.admin.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author zhangyuxi, {@literal <yuxi.zhang@leyantech.com>}
 * @date 2022-07-02
 */
@Controller
public class MenuController {


  @RequestMapping("/menu")
  public String menu() {
    return "menu";
  }

  @RequestMapping("/home")
  public String home() {
    return "home";
  }
}
