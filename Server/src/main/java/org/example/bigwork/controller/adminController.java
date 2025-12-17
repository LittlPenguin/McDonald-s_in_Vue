package org.example.bigwork.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.example.bigwork.entity.admin;
import org.example.bigwork.response.PageResponse;
import org.example.bigwork.response.Response;
import org.example.bigwork.service.adminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/admin")
@Tag(name = "身份接口")
public class adminController {
    @Autowired
    private adminService adminService;

    //新增方法
    @Operation(summary = "新增管理员")
    @PostMapping("/admin/add")
    public Response add(@RequestBody admin admin) {
        LambdaQueryWrapper<admin> lambdaQueryWrapper = new LambdaQueryWrapper<>();
        lambdaQueryWrapper.eq(admin::getUsername, admin.getUsername());
        if (adminService.exists(lambdaQueryWrapper)) {
            return Response.fail("用户名已存在");
        }
        adminService.save(admin);
        return Response.success();
    }

    //分页查询方法（带分页信息）
    @Operation(summary = "分页查询管理员（带分页信息）")
    @GetMapping("/admin/list")
    public Response<PageResponse<admin>> listWithPageInfo(
            @RequestParam(defaultValue = "1") int limitPage,
            @RequestParam(defaultValue = "10") int limitSize) {
        return Response.data(adminService.listWithPageInfo(limitPage, limitSize));
    }

    //更新方法
    @Operation(summary = "更新管理员")
    @PostMapping("/admin/update")
    public Response update(@RequestBody admin admin) {
        adminService.updateById(admin);
        return Response.success();
    }

    //删除方法
    @Operation(summary = "删除管理员")
    @PostMapping("/admin/delete")
    public Response delete(@RequestParam Long id) {
        adminService.removeById(id);
        return Response.success();
    }
}
