// 加载本地数据
const ls = window.localStorage;
// 格式化日期数据
function formatNumber(n) {
    n = n.toString();
    return n[1] ? n : '0' + n;
}
// 格式化时间数据
function formatTime(n) {
    n = n.toString();
    return n[1] ? n : '0' + n;
}
var vm = new Vue({
    el: '#todone',
    data: {
        date: "",
        list: {},
        index: 0,
        historyList: {},
        newContent: "",
        isAdd: false
    },
    created: function() {
        this.list = JSON.parse(ls.getItem("list"));
        this.historyList = JSON.parse(ls.getItem("historyList"));
        console.log(this.list);
        console.log(this.historyList);
        var tempDate = new Date();
        this.date = [tempDate.getFullYear(), tempDate.getMonth() + 1, tempDate.getDate()].map(formatNumber).join('-');
        var saver = window.setInterval(this.save, 60000);
    },
    methods: {
        // 完成
        done: function(e) {
            var idx = e.target.attributes.index.value;
            this.list.todos[idx].check = !this.list.todos[idx].check
        },
        // 打开输入面板
        addToDo: function() {
            this.isAdd = !this.isAdd;
        },
        // 提交新的待办
        sendToDo: function() {
            var tempDate = new Date();
            var newTodo = {
                "check": false,
                "content": this.newContent,
                "time": [tempDate.getHours(), tempDate.getMinutes() + 1, tempDate.getSeconds()].map(formatNumber).join(':')
            }
            console.log(newTodo);
            this.list.todos.push(newTodo);
            this.newContent="";
            // 存储
            ls.setItem("list", JSON.stringify(this.list));
        },
        // 删除待办
        deleteDone: function() {
            for (var i = this.list.todos.length - 1; i >= 0; i--) {
                if (this.list.todos[i].check) {
                    this.list.todos.splice(i, 1);
                }
            }
            // 存储
            ls.setItem("list", JSON.stringify(this.list));
        },
        // 完成
        done2: function(e) {
            var idx = e.target.attributes.index.value;
            this.historyList.todos[idx].check = !this.historyList.todos[idx].check
        },
        // 删除待办
        deleteDone2: function() {
            for (var i = this.historyList.todos.length - 1; i >= 0; i--) {
                if (this.historyList.todos[i].check) {
                    this.historyList.todos.splice(i, 1);
                }
            }
            // 存储
            ls.setItem("historyList", JSON.stringify(this.historyList));
        },
        // 更新并保存
        save: function() {
            var tempDate = new Date();
            tempDate = [tempDate.getFullYear(), tempDate.getMonth() + 1, tempDate.getDate()].map(formatNumber).join('-');
            if (tempDate != this.date) {
                console.log("save");
                var that = this;
                this.list.todos.map(function(item) {
                    that.historyList.todos.push(item);
                })
                this.list.todos = [];
                this.date = tempDate;
                ls.setItem("historyList", JSON.stringify(this.historyList));
                ls.setItem("list", JSON.stringify(this.list));
            }
        }
    }
})