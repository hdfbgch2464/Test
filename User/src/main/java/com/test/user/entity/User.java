package com.test.user.entity;

import java.time.LocalDateTime;
import java.io.Serializable;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * <p>
 * 用户
 * </p>
 *
 * @author zyx
 * @since 2022-05-26
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class User implements Serializable {

    private static final long serialVersionUID=1L;

    /**
     * 账号
     */
    private String account;

    /**
     * 手机号
     */
    private String phoneNumber;

    /**
     * 邮箱
     */
    private String email;

    /**
     * 昵称
     */
    private String name;

    /**
     * 密码，Argon2哈希
     */
    private String password;

    /**
     * 头像
     */
    private String avatar;

    /**
     * 创建时间
     */
    private LocalDateTime createAt;

    /**
     * 更新时间
     */
    private LocalDateTime updateAt;

    /**
     * 是否被删
     */
    private Integer deleted;

    /**
     * 最近登录时间
     */
    private LocalDateTime lastLoginTime;


}
