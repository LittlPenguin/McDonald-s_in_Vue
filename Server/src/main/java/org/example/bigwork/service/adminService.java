package org.example.bigwork.service;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.extension.service.IService;
import org.example.bigwork.entity.admin;
import org.example.bigwork.response.PageResponse;

import java.util.List;

public interface adminService extends IService<admin> {
    //    配置查询管理员方法，返回一定数量的管理员列表
    PageResponse<admin> listWithPageInfo(int currentPage, int pageSize);
}
