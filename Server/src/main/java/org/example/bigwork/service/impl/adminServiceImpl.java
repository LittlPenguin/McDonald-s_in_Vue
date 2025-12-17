package org.example.bigwork.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.example.bigwork.entity.admin;
import org.example.bigwork.mapper.adminMapper;
import org.example.bigwork.response.PageResponse;
import org.example.bigwork.service.adminService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class adminServiceImpl extends ServiceImpl<adminMapper, admin> implements adminService {
    @Override
    public PageResponse<admin> listWithPageInfo(int limitPage, int limitSize) {
        // 获取总记录数
        long total = this.count();
        // 获取当前页数据
        List<admin> data = list(new LambdaQueryWrapper<admin>()
                .orderByAsc(admin::getId)
                .last("limit " + (limitPage - 1) * limitSize + "," + limitSize));
        // 返回分页响应对象
        return new PageResponse<>(data, limitPage, limitSize, total);
    }
}
