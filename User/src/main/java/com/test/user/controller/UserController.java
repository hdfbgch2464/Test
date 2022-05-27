package com.test.user.controller;


import com.test.user.entity.User;
import com.test.user.model.ResultWrapper;
import com.test.user.request.SaveUserRequest;
import com.test.user.service.IUserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

/**
 * <p>
 * 用户 前端控制器
 * </p>
 *
 * @author zyx
 * @since 2022-05-26
 */
@RestController
@RequestMapping("/user")
@AllArgsConstructor
public class UserController {

  @Autowired
  private final IUserService userService;

  @PostMapping("/saveUser")
  public ResultWrapper saveUser(@RequestBody SaveUserRequest saveUserRequest) {
    User user = new User();
    user.setAccount(saveUserRequest.getAccount());
    user.setPassword(saveUserRequest.getPassword());
    userService.save(user);
    return ResultWrapper.buildSuccess();
  }
}

