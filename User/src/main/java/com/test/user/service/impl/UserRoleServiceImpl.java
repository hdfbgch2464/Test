package com.test.user.service.impl;

import com.test.user.entity.UserRole;
import com.test.user.mapper.UserRoleMapper;
import com.test.user.service.IUserRoleService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 用户角色关系 服务实现类
 * </p>
 *
 * @author zyx
 * @since 2022-05-26
 */
@Service
public class UserRoleServiceImpl extends ServiceImpl<UserRoleMapper, UserRole> implements IUserRoleService {

}
