/**
 * Created by J on 2017/4/12.
 */

(function (window) {
    function MdTOCNav(option) {
        this._init(option)
        this._do()
    }

    MdTOCNav.prototype = {
        _init: function (option) {
            this.el = option && option.el || 'main'  //传入id标识符
            this.rootArea = document.getElementById(this.el) || document.body
            this.allNodes = []    //存放所有后代节点
            this.level = option && option.level && option.level > 1 && option.level < 7 || 3    //要求option.level在2~6之间

            this.tocDataArr = []    //用于生成TOC存放的数据
            this.newTocData = {}    //用于push到TOC
            this.levelBoolean = ['H2', 'H3', 'H4', 'H5', 'H6']
            this.levelCount = [0, 0, 0, 0, 0]  //为了实现serialNum标题编号而计数

            //根据this.level值，动态更改遍历时需要判断是否在level层级内的判断数组levelBoolean
            this.levelBoolean = this.levelBoolean.slice(0, this.level - 1)

            this.tocLiHtmls = ''
            this.newTocLiHtml = ''

            this.styles = option && option.style || '#mdTocNav{position:fixed;top:50px;left:10px;width:200px;height:500px;overflow-x:hidden;overflow-y:auto;border-radius:.5em;background:#eee;list-style-type:none;padding:10px}#mdTocNav li{line-height:1.8}.mdh2{padding:.2em 0 0}.mdh3{padding:0 .5em}.mdh4{padding:0 1em}.mdh5{padding:0 1.5em}.mdh6{padding:0 2em}#mdTocNav a{color:#666;text-decoration:none;border-bottom:1px solid #ccc}.mdh2 a{color:#333}.nav-number{margin-right:.5em;color:#999}.mdh2 .nav-number{margin-right:.8em}span.nav-text{white-space:nowrap}'
        },
        _traverseNodes: function () {
            var that = this
            function tn(node) {
                if(node.hasChildNodes){
                    var cNodes = node.children
                    for(var i = 0;i<cNodes.length;i++){
                        that.allNodes.push(cNodes[i])
                        tn(cNodes[i])
                    }
                }
            }
            tn(this.rootArea)
        },
        _createTocArr: function () {


            //遍历数组获取相关信息
            for (var i = 0; i < this.allNodes.length; i++) {
                var tagName = this.allNodes[i].tagName
                for (var x = 0; x < this.levelBoolean.length; x++) {
                    if (this.levelBoolean[x] === tagName) {
                        var that = this
                        // 此时x与h1~6建立联系
                        this.newTocData = {
                            className: 'mdh' + (x + 2),
                            serialNum: (function (that) {
                                that.levelCount[x]++
                                that.levelCount.splice(x + 1, that.levelCount.length - x - 1, 0, 0, 0, 0, 0)    //上一层的计数变化时重置之后的计数
                                return that.levelCount.slice(0, x + 1).join('.')    //截取对应的编号应该有的数字，并转化为字符串
                            })(that),
                            targetId: 'mdTocNav' + this.newTocData.serialNum,
                            text: this.allNodes[i].innerText
                        }
                        this.tocDataArr.push(this.newTocData)
                        this.allNodes[i].id += (this.allNodes[i].id ? ' ' : '') + this.newTocData.targetId
                    }

                }
            }
        },
        _createNav: function () {
            for (var i = 0; i < this.tocDataArr.length; i++) {
                this.newTocLiHtml = '<li class="' + this.tocDataArr[i].className + '">' +
                    '<a href="#' + this.tocDataArr[i].targetId + '">' +
                    '<span class="nav-number">' + this.tocDataArr[i].serialNum + '</span>' +
                    '<span class="nav-text">' + this.tocDataArr[i].text + '</span>' +
                    '</a>' +
                    '</li>'
                this.tocLiHtmls += this.newTocLiHtml
            }
            var mdTocNav = document.createElement('ol')
            mdTocNav.setAttribute('id', 'mdTocNav')
            mdTocNav.innerHTML = this.tocLiHtmls
            document.body.appendChild(mdTocNav)
        },
        _addStyle: function () {
            var newStyle = document.createElement('style')
            newStyle.innerHTML = this.styles
            document.getElementsByTagName('head')[0].appendChild(newStyle)
        },
        _do: function () {
            this._addStyle()
            this._traverseNodes()
            this._createTocArr()
            this._createNav()
        }
    }


    window.MdTOCNav = MdTOCNav


    window.j_ready = function (fn) {
        if (document.addEventListener) {//兼容非IE
            document.addEventListener("DOMContentLoaded", function () {
                //注销事件，避免反复触发
                document.removeEventListener("DOMContentLoaded", arguments.callee, false);
                fn();//调用参数函数
            }, false);
        } else if (document.attachEvent) {//兼容IE
            document.attachEvent("onreadystatechange", function () {
                if (document.readyState === "complete") {
                    document.detachEvent("onreadystatechange", arguments.callee);
                    fn();
                }
            });
        }
    }
})(window)


window.j_ready(function () {
    console.profile('mdTocNav 性能测试')
    var a = new MdTOCNav()
    console.profileEnd()
})