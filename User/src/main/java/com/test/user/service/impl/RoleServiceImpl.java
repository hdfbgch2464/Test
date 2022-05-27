package com.test.user.service.impl;

import com.test.user.entity.Role;
import com.test.user.mapper.RoleMapper;
import com.test.user.service.IRoleService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 角色 服务实现类
 * </p>
 *
 * @author zyx
 * @since 2022-05-26
 */
@Service
public class RoleServiceImpl extends ServiceImpl<RoleMapper, Role> implements IRoleService {

}
