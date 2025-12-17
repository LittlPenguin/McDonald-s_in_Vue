package org.example.bigwork.response;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PageResponse<T> {
    private List<T> data;       // 当前页数据
    private int currentPage;    // 当前页码
    private int pageSize;       // 每页大小
    private long total;         // 总记录数
    private int totalPages;     // 总页数


    public PageResponse(List<T> data, int currentPage, int pageSize, long total) {
        this.data = data;
        this.currentPage = currentPage;
        this.pageSize = pageSize;
        this.total = total;
        // 计算总页数
        this.totalPages = (int) Math.ceil((double) total / pageSize);
    }
}
