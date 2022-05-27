package com.test.user.request;

import lombok.Data;

/**
 * @author zhangyuxi, {@literal <zhangyuxi@leyantech.com>}
 * @date 2022-05-26.
 */
@Data
public class SaveUserRequest {

  private String account;

  private String password;
}
