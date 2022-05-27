package com.test.user.model;

import lombok.Data;

import java.io.Serializable;

/**
 * @author zhangyuxi, {@literal <yuxi.zhang@leyantech.com>}
 * @date 2022-01-18
 */
@Data
public class ResultWrapper<T> implements Serializable {

  private static final long serialVersionUID = 1L;

  private Integer code = 200;

  private String msg = "";

  private T data;

  /**
   * 构造成功返回.
   */
  public static <T> ResultWrapper<T> buildSuccess(T result) {
    ResultWrapper<T> resultWrapper = new ResultWrapper<>();
    resultWrapper.setData(result);
    return resultWrapper;
  }

  /**
   * .
   */
  public static <T> ResultWrapper<T> buildSuccess() {
    ResultWrapper<T> resultWrapper = new ResultWrapper<>();
    return resultWrapper;
  }

}
