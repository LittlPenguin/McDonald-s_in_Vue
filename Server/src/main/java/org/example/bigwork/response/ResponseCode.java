//负责处理响应结果
package org.example.bigwork.response;
import lombok.AllArgsConstructor;
import lombok.Getter;

//使用全部参数构造方法
@AllArgsConstructor
@Getter
public enum ResponseCode {
    SUCCESS(200, "操作成功"),
    ERROR(400, "操作失败");

    private Integer code;
    private String message;

}
