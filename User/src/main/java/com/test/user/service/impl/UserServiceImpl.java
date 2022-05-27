package com.test.user.service.impl;

import com.test.user.entity.User;
import com.test.user.mapper.UserMapper;
import com.test.user.service.IUserService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 用户 服务实现类
 * </p>
 *
 * @author zyx
 * @since 2022-05-26
 */
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements IUserService {

}
