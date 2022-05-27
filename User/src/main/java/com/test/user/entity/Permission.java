package com.test.user.entity;

import java.time.LocalDateTime;
import java.io.Serializable;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * <p>
 * 权限
 * </p>
 *
 * @author zyx
 * @since 2022-05-26
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class Permission implements Serializable {

    private static final long serialVersionUID=1L;

    /**
     * 权限名
     */
    private String name;

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
