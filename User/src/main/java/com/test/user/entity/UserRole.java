package com.test.user.entity;

import java.time.LocalDateTime;
import java.io.Serializable;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * <p>
 * 用户角色关系
 * </p>
 *
 * @author zyx
 * @since 2022-05-26
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class UserRole implements Serializable {

    private static final long serialVersionUID=1L;

    /**
     * 用户id
     */
    private Long userId;

    /**
     * 角色id
     */
    private Integer roleId;

    /**
     * 角色名
     */
    private String roleName;

    /**
     * 创建时间
     */
    private LocalDateTime createdAt;

    /**
     * 更新时间
     */
    private LocalDateTime updatedAt;

    /**
     * 是否被删
     */
    private Integer deleted;


}
