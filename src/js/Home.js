/**
 * Created by Administrator on 2017/7/28.
 */
import React, { Component } from 'react';
import $ from 'jquery';
class Home extends Component {
    constructor() {
        super();
        this.state = {
            banner: [{"src": "", "id": ""}],
            aid: null,
            main_con: [{"id": "", "txt": "", "txt1": ""}],
            main_con1: [{"id": "", "txt": "", "txt1": ""}],
            uid: "",
        }
    }

    componentDidMount() {

        //上传图片
        $.ajax({
            url: 'http://192.168.43.5:8005/banner/banner',
            type: 'get',
            success: function (b) {
                this.setState({
                    banner: b
                })
            }.bind(this)
        });
        var lunboA = document.getElementById('lunboA');
        lunboA.onclick = function (e) {
            //删除轮播图片
            var ev = e || window.event;
            var target = ev.target || ev.srcElement;
            if (target.innerHTML == "删除") {
                var id = target.parentNode.parentNode.children[0].innerHTML;
                $.ajax({
                    type: "post",
                    url: "http://localhost:8005/banner/delBanner",
                    data: {"id": id},
                    success: function (e) {
                        this.setState({
                            banner: e
                        })
                    }.bind(this),
                    error: function () {
                        console.log("删除失败")
                    }
                });
                // 修改轮播图片
            } else if (target.innerHTML == "修改") {
                var id = target.parentNode.parentNode.children[0].innerHTML;
                // var src = target.parentNode.parentNode.children[1].innerHTML;
                this.setState({
                    aid: id
                });
                $('.updateBox').css('display', 'block');
            }
        }.bind(this)


        //    课程列表文字删除
        // var listC=document.getElementById('listC');
        // listC.onclick= (e)=> {
        //     var ev=e||window.event;
        //     var target = ev.target || ev.srcElement;
        // if(target.innerHTML=="删除"){
        //     var id = target.parentElement.parentElement.firstElementChild.innerHTML;
        //     $.ajax({
        //         type: "post",
        //         url: "http://localhost:8005/main/delMain_con",
        //         data: {"id": id},
        //         success: function (e) {
        //             console.log(this);
        //             this.setState({
        //                 main_con:e
        //             })
        //         }.bind(this),
        //         error: function () {
        //             console.log("删除失败")
        //         }
        //     });
        //
        // }
        //         if(target.innerHTML=="修改"){
        //             $('.listCourse').css('display', 'block');
        //             var id = target.parentNode.parentNode.children[0].innerHTML;
        //             this.setState({
        //                 id:id
        //             })
        //         }
        //     };

        //课程列表文字修改
        $.ajax({
            url: 'http://192.168.43.5:8005/main',
            type: 'get',
            success: function (e) {
                this.setState({main_con1: e});
            }.bind(this)
        });
    }

    setFiles = function (element) {
        console.log(element);
        var files = [];
        files = element.files[0];
        var fd = new FormData();  //表单处理数据的方法
        fd.append('uploadedFile', files)
        //用append方法以键值对的方式保存
        console.log(fd);
        $.ajax({
            type: "post",
            url: "http://localhost:8005/banner/banner",
            async: true,
            data: fd,
            contentType: false,
            processData: false,
            success: function (e) {
                alert("上传成功")
            }.bind(this),
            error: function () {
                alert("上传失败")
            }
        });
    }.bind(this);

    setimg = function (element) {
        console.log(element);
        var files = [];
        files = element.files[0];
        var fd = new FormData();  //表单处理数据的方法
        fd.append('uploadedFile', files)
        //用append方法以键值对的方式保存
        console.log(fd);
        $.ajax({
            type: "post",
            url: "http://localhost:8005/banner/banimg",
            async: true,
            data: fd,
            contentType: false,
            processData: false,
            success: function (e) {

                $.ajax({
                    type: "post",
                    url: "http://localhost:8005/banner/upBanner",
                    data: {"id": this.state.aid},
                    success: function (e) {
                        alert(e)

                    }.bind(this),
                    error: function () {
                        console.log("修改失败")
                    }
                });


            }.bind(this),
            error: function () {
                alert("上传失败")
            }
        });
    }.bind(this);


    //课程列表文字修改
    rev(event) {
        $(".listCourse").css("display", "block");

        var aa = event.target;
        var id = aa.parentElement.parentElement.firstElementChild.innerHTML;
        this.setState({
            uid: id,
        })
    };


    confirmfn() {

        var val1 = $(".listCourse input:nth-of-type(1)").val();
        var val2 = $(".listCourse input:nth-of-type(2)").val();


        $(".listCourse").css("display", "none");

        if (val1 == "" || val2 == "") {
            alert("不能为空")
        } else {
            $.ajax({
                type: "post",
                url: "http://192.168.43.5:8005/main/upMain_con",
                data: {
                    id: this.state.uid,
                    val1: val1,
                    val2: val2
                },
                success: function (e) {
                    this.setState({
                        main_con: e
                    })
                }.bind(this),
                error: function () {
                    console.log("失败")
                }
            });
        }
    }
    render(){

        return (
            <div className="HomeA">
                <h3>banner图片</h3>
                <ul className="bannerA">
                    <li>id</li>
                    <li>img</li>
                    <li><input type="file" ref="fils1" onChange={this.setFiles.bind(null,this.refs.fils1)}  multiple="multiple"/></li>
                </ul>
                <div id="lunboA">
                    {this.state.banner.map(function(v,i){
                        return <ul key={i} className="bannerA">
                                <li>{v.id}</li>
                                <li><img src={v.src}/></li>
                                <li><button>删除</button></li>
                                <li>
                                    <button>修改</button>
                                </li>
                                <div className="updateBox">
                                    <input type="file" ref="filaa" onChange={this.setimg.bind(null,this.refs.filaa)}/>
                                </div>
                            </ul>
                    }.bind(this))}
                </div>


                <h3>课程列表</h3>
                <ul className="listA">
                    <li>id</li>
                    <li>txt</li>
                    <li>txt1</li>
                </ul>
                <div className="listC" id="listC">
                    {this.state.main_con1.map(function(v,i){
                        return <ul key={i} className="courseA">
                            <li>{v.id}</li>
                            <li>{v.txt}</li>
                            <li>{v.txt1}</li>
                            <li><button onClick={this.rev.bind(this)}>修改</button></li>
                        </ul>

                    }.bind(this))}
                    <div className="listCourse">
                        <input type="text"/>
                        <input type="text"/>
                        <button id="confirm" onClick={this.confirmfn.bind(this)}>确定</button>
                    </div>
                </div>

            </div>

        )
    }
}
export default Home
