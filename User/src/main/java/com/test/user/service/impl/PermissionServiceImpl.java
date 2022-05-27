package com.test.user.service.impl;

import com.test.user.entity.Permission;
import com.test.user.mapper.PermissionMapper;
import com.test.user.service.IPermissionService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 权限 服务实现类
 * </p>
 *
 * @author zyx
 * @since 2022-05-26
 */
@Service
public class PermissionServiceImpl extends ServiceImpl<PermissionMapper, Permission> implements IPermissionService {

}
