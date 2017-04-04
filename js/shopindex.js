/**
 * Created by Administrator on 2017/3/28.
 * 购物车首页的vue.js用于数据绑定
 */
new Vue({
    el: "#notice_index",
    data: {
        total_price: 0,
        noticeList: [],
        delitem: ''
    },
    filters: {
        formatMoney: function (value) {
            return "￥" + value.toFixed(2);
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            this.noticedetail();
        })
    },
    methods: {
        //获取json文件的 数据
        noticedetail: function () {
            this.$http.get("json/noticeList.json").then(res => {
                this.noticeList = res.body.noticelist;
            })
        },
        //商品数量加减函数
        changeMoney: function (notice, way) {
            if (way > 0) {
                notice.number++;
                if (notice.number > 99) {
                    notice.number = 99;
                }
            } else {
                notice.number--;
                if (notice.number < 0) {
                    notice.number = 0;
                }
            }
            this.totalPrice;
        },
        //商品选择
        selectnotice: function (item, way) {
            if (way > 0) {
                item.checked = true;
            } else {
                item.checked = false;
            }
            this.totalPrice;
        },
        //商品是否要 全选中
        selectall: function (way) {
            this.noticeList.forEach(item => {
                //IE浏览器 可能不支持箭头函数把 item=>改成function(item)就好。
                if (way > 0) {
                    item.checked = true;
                } else {
                    item.checked = false;
                }
            })
            this.totalPrice;
        },
        //删除商品
        delconfirm: function (item) {
            this.delitem = item;
        }
    },
    computed: {
        //结账 总金额的实时计算
        totalPrice: function () {
             //IE浏览器 可能不支持箭头函数把 item=>改成function(item)就好。再加上 _this=this。
            this.total_price = 0;
            this.noticeList.forEach(item => {
                if (item.checked == true) {
                    this.total_price += item.danprice * item.number;
                }
            })
        }
    }
});
