-- 移除CHECK约束后的表结构（适配MySQL 5.7及以下）
CREATE TABLE IF NOT EXISTS mcdonalds_user_purchase (
    purchase_id INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '购买记录ID',
    user_email VARCHAR(100) NOT NULL COMMENT '用户邮箱（关联account.CountEmail）',
    goods_id INT UNSIGNED NOT NULL COMMENT '商品ID（关联mcdonalds_goods.goods_id）',
    buy_quantity INT UNSIGNED NOT NULL DEFAULT 1 COMMENT '购买数量',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '购买时间',
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',

    PRIMARY KEY (purchase_id),
    INDEX idx_user_goods (user_email, goods_id),
    INDEX idx_goods_id (goods_id),
    CONSTRAINT fk_purchase_goods FOREIGN KEY (goods_id) 
        REFERENCES mcdonalds_goods (goods_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT '用户购买商品记录表';

