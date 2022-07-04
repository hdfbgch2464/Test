package com.test.admin.service.impl;

import com.test.admin.entity.Org;
import com.test.admin.mapper.OrgMapper;
import com.test.admin.service.IOrgService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 客户 服务实现类
 * </p>
 *
 * @author zyx
 * @since 2022-07-04
 */
@Service
public class OrgServiceImpl extends ServiceImpl<OrgMapper, Org> implements IOrgService {

}
