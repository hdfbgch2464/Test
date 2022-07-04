package com.test.admin.entity;

import java.time.LocalDateTime;
import java.io.Serializable;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * <p>
 * 客户
 * </p>
 *
 * @author zyx
 * @since 2022-07-04
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class Org implements Serializable {

    private static final long serialVersionUID=1L;

    /**
     * 客户名(公司名称)
     */
    private String name;

    /**
     * 前缀
     */
    private String prefix;

    /**
     * 客户来源渠道,比如:maliujia
     */
    private String orgChannel;

    /**
     * 渠道关联客户id
     */
    private String externalOrgId;

    /**
     * 试用过期时间
     */
    private LocalDateTime tryExpireTime;

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

    /**
     * 套餐截止时间
     */
    private LocalDateTime activeEndTime;

    /**
     * 套餐账户数
     */
    private Integer activeAccountNum;

    /**
     * 套餐名
     */
    private String combo;


}
