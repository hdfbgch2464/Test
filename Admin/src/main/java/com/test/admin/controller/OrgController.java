package com.test.admin.controller;


import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.test.admin.entity.Org;
import com.test.admin.module.LayuiData;
import com.test.admin.service.IOrgService;
import lombok.CustomLog;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
@Slf4j
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


  @RequestMapping("/org/orgModify")
  private void tryExpireModify(Model model, Integer id, String oldTryExpire, String newTryExpire) {
    log.info("id={},oldTryExpire={},newTryExpire={}", id, oldTryExpire, newTryExpire);
  }

  @RequestMapping("/orgModify")
  private String modify(Model model, Integer id, String oldTryExpire, String newTryExpire) {
    log.info("id={},oldTryExpire={},newTryExpire={}", id, oldTryExpire, newTryExpire);
    model.addAttribute("id", id);
    model.addAttribute("oldTryExpire", oldTryExpire);
    return "orgTryExpireModify";
  }

}

