package com.test.admin.controller;


import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.test.admin.entity.Org;
import com.test.admin.module.LayuiData;
import com.test.admin.service.IOrgService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * <p>
 * 客户 前端控制器
 * </p>
 *
 * @author zyx
 * @since 2022-07-04
 */
@Controller
@RequiredArgsConstructor
public class OrgController {

  private final IOrgService orgService;


  @RequestMapping("/orgManager")
  private String orgManager() {
    return "orgManager";
  }

  @ResponseBody
  @RequestMapping("/org/list")
  private LayuiData getOrgList(Model model) {
    final List<Org> orgs = orgService.getBaseMapper().selectList(new LambdaQueryWrapper<>());
    model.addAllAttributes(orgs);
    return LayuiData.ok(orgs, 10L);
  }

}

