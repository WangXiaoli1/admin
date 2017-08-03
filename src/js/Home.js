/**
 * Created by Administrator on 2017/7/28.
 */
import React, { Component } from 'react';
import $ from 'jquery';
class Home extends Component {
    constructor() {
        super();
        this.state = {
            //轮播图片
            banner: [{"src": "", "id": ""}],
            aid: null,
            //课程列表
            main_con: [{"id": "", "txt": "", "txt1": ""}],
            main_con1: [{"id": "", "txt": "", "txt1": ""}],
            uid: "",
            // 特色课程
            main_special:[{"id":"","course":"","txt":"","con":""}],
            main_special1:[{"id":"","course":"","txt":"","con":""}],
            sid:"",
        //    彩绘课程
            main_side_l:[{"id":"","course":"","txt":"","con":"","src2":""}],
            main_side_l1:[{"id":"","course":"","txt":"","con":"","src2":""}],
            lid:"",
        //    品格教育
            main_side_r:[{"id":"","course":"","txt":"","con":"","src1":"","src2":"","src4":""}],
            main_side_r1:[{"id":"","course":"","txt":"","con":"","src1":"","src2":"","src4":""}],
            rid:"",

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
                    url: "http://192.168.43.5:8005/banner/delBanner",
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
        var listC=document.getElementById('listC');
        listC.onclick= (e)=> {
            var ev=e||window.event;
            var target = ev.target || ev.srcElement;
        if(target.innerHTML=="删除"){
            var id = target.parentElement.parentElement.firstElementChild.innerHTML;
            $.ajax({
                type: "post",
                url: "http://localhost:8005/main/delMain_con",
                data: {"id": id},
                success: function (e) {
                    console.log(this);
                    this.setState({
                        main_con:e
                    })
                }.bind(this),
                error: function () {
                    console.log("删除失败")
                }
            });

        }
                if(target.innerHTML=="修改"){
                    $('.listCourse').css('display', 'block');
                    var id = target.parentNode.parentNode.children[0].innerHTML;
                    this.setState({
                        id:id
                    })
                }
            };

        //课程列表文字调取
        $.ajax({
            url: 'http://192.168.43.5:8005/main',
            type: 'get',
            success: function (e) {
                this.setState({main_con1: e});
            }.bind(this)
        });
        //特色课程文字 调取
        $.ajax({
            url: 'http://192.168.43.5:8005/special',
            type: 'get',
            success: function (e) {
                this.setState({main_special1: e});
            }.bind(this)
        })
        //彩绘课程文字 调取
        $.ajax({
            url: 'http://192.168.43.5:8005/side_l',
            type: 'get',
            success: function (e) {
                this.setState({main_side_l1: e});
            }.bind(this)
        })
    //    品格教育文字 调取
        $.ajax({
            url: 'http://192.168.43.5:8005/side_r',
            type: 'get',
            success: function (e) {
                this.setState({main_side_r1: e});
            }.bind(this)
        })

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

            type:"post",
            url:"http://192.168.43.5:8005/banner/banner",
            async:true,
            data:fd,
            contentType:false,
            processData:false,
            success:function(e){

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

    //彩绘课程图片修改
    setimg1 = function (element) {
        console.log(element);
        var files = [];
        files = element.files[0];
        var fd = new FormData();  //表单处理数据的方法
        fd.append('uploadedFile', files)
        //用append方法以键值对的方式保存
        console.log(fd);
        $.ajax({
            type: "post",
            url: "http://localhost:8005/side_l/side_l_img",
            async: true,
            data: fd,
            contentType: false,
            processData: false,
            success: function (e) {
                $.ajax({
                    type: "post",
                    url: "http://localhost:8005/side_l/upMain_side_l",
                    data: {"id": this.state.lid},
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

    //品格教育图片修改
    setimg2 = function (element) {
        console.log(element);
        var files = [];
        files = element.files[0];
        var fd = new FormData();  //表单处理数据的方法
        fd.append('uploadedFile', files)
        //用append方法以键值对的方式保存
        console.log(fd);
        $.ajax({
            type: "post",
            url: "http://localhost:8005/side_r/side_r_img",
            async: true,
            data: fd,
            contentType: false,
            processData: false,
            success: function (e) {
                $.ajax({
                    type: "post",
                    url: "http://localhost:8005/side_r/upMain_side_r",
                    data: {"id": this.state.rid},
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

    //特色课程 文字修改
    specialC=function(event) {
        $(".specialCourse").css("display", "block");
        var bb = event.target;
        var id = bb.parentElement.parentElement.firstElementChild.innerHTML;
        console.log(id)
        this.setState({
            sid: id,
        })
    }.bind(this);
    ok(){
        var course = $(".specialCourse input:nth-of-type(1)").val();
        var txt = $(".specialCourse input:nth-of-type(2)").val();
        var con = $(".specialCourse input:nth-of-type(3)").val();
        $(".specialCourse").css("display", "none");
        if (course == "" || txt == ""||con=="") {
            alert("不能为空")
        } else {
            $.ajax({
                type: "post",
                url: "http://192.168.43.5:8005/special/upMain_special",
                data: {
                    id:this.state.sid,
                    course:course,
                    txt:txt,
                    con:con
                },
                success: function (e) {
                    this.setState({
                        main_specia: e
                    })
                }.bind(this),
                error: function () {
                    console.log("失败")
                }
            });
        }
    }

    //彩绘课程 文字修改
    caihuiC=function(event) {
        $(".caihuiCourse").css("display", "block");
        var cc = event.target;
        var id = cc.parentElement.parentElement.firstElementChild.innerHTML;
        console.log(id)
        this.setState({
            lid: id,
        })
    }.bind(this);
    ok1(){
        var valA = $(".caihuiCourse input:nth-of-type(1)").val();
        var valB = $(".caihuiCourse input:nth-of-type(2)").val();
        var valC = $(".caihuiCourse input:nth-of-type(3)").val();
        $(".caihuiCourse").css("display", "none");
        if (valA == "" || valB == ""||valC=="") {
            alert("不能为空")
        } else {
            $.ajax({
                type: "post",
                url: "http://192.168.43.5:8005/side_l/upMain_side_l",
                data: {
                    id: this.state.lid,
                    valA:valA,
                    valB:valB,
                    valC:valC

                },
                success: function (e) {
                    this.setState({
                        main_side_l: e
                    })
                }.bind(this),
                error: function () {
                    console.log("失败")
                }
            });
        }
    }

    //品格教育文字修改
    eduC=function(event) {
        $(".eduCourse").css("display", "block");
        var dd = event.target;
        var id = dd.parentElement.parentElement.firstElementChild.innerHTML;
        console.log(id)
        this.setState({
            rid: id,
        })
    }.bind(this);
    ok2(){
        var course = $(".eduCourse input:nth-of-type(1)").val();
        var txt = $(".eduCourse input:nth-of-type(2)").val();
        var con = $(".eduCourse input:nth-of-type(3)").val();
        $(".eduCourse").css("display", "none");
        if (course == "" || txt == ""||con=="") {
            alert("不能为空")
        } else {
            $.ajax({
                type: "post",
                url: "http://192.168.43.5:8005/side_r/upMain_side_r",
                data: {
                    id: this.state.rid,
                    course:course,
                    txt:txt,
                    con:con

                },
                success: function (e) {
                    this.setState({
                        main_side_r: e
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
                {/*轮播图  start*/}

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
                {/*轮播图 end*/}

                {/*课程列表  start*/}
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
                        <input type="text" placeholder="txt"/>
                        <input type="text" placeholder="txt1"/>
                        <button id="confirm" onClick={this.confirmfn.bind(this)}>确定</button>
                    </div>
                </div>
                {/*课程列表  end*/}


                {/*特色课程  start*/}
                <h3>特色课程</h3>
                <ul className="specialA">
                    <li>id</li>
                    <li>course</li>
                    <li>txt</li>
                    <li>con</li>
                </ul>
                <div className="specialB">
                    {this.state.main_special1.map((v,i)=> {
                        return <div className="specialBIn"  key={i}>
                            <ul className="title">
                                <li>{v.id}</li>
                                <li><button onClick={this.specialC}>修改</button></li>
                            </ul>
                            <ul className="title">
                                <li>{v.course}</li>
                                {/*<li><button>删除</button></li>*/}
                            </ul>
                            <ul className="title">
                                <li>{v.txt}</li>
                                {/*<li><button>删除</button></li>*/}
                            </ul>
                            <ul className="title">
                                <li>{v.con}</li>
                                {/*<li><button>删除</button></li>*/}
                            </ul>
                                <div className="specialCourse">
                                    <input type="text" placeholder="course"/>
                                    <input type="text" placeholder="txt"/>
                                    <input type="text" placeholder="con"/>
                                    <button id="ok" onClick={this.ok1.bind(this)}>确定</button>

                            </div>
                        </div>

                    })
                    }
                </div>
                {/*特色课程  end*/}
                {/*彩绘课程 start*/}
                    <h3>彩绘课程</h3>
                <div className="caihui">
                    <ul className="specialA">
                        <li>id</li>
                        <li>course</li>
                        <li>txt</li>
                        <li>con</li>
                        <li>img</li>
                    </ul>
                    <div className="specialB">
                        {this.state.main_side_l1.map((v,i)=> {
                            return <div className="specialBIn"  key={i}>
                                <ul>
                                    <li>{v.id}</li>
                                    <li><button onClick={this.caihuiC}>修改</button></li>
                                </ul>
                                <ul>
                                    <li>{v.course}</li>
                                    {/*<li><button>删除</button></li>*/}
                                </ul>
                                <ul>
                                    <li>{v.txt}</li>
                                    {/*<li><button>删除</button></li>*/}
                                </ul>
                                <ul>
                                    <li>{v.con}</li>
                                    {/*<li><button>删除</button></li>*/}
                                </ul>
                                <ul>
                                    <li><img src={v.src2} alt=""/></li>
                                    {/*<li><button>删除</button></li>*/}
                                </ul>
                                <div className="caihuiCourse">
                                    <input type="text" placeholder="course"/>
                                    <input type="text" placeholder="txt"/>
                                    <input type="text" placeholder="con"/>
                                    <input type="file" ref="filbb" onChange={this.setimg1.bind(null,this.refs.filbb)}/>
                                    <button id="ok1" onClick={this.ok1.bind(this)}>确定</button>
                                </div>
                            </div>


                        })

                        }
                    </div>
                </div>
                {/*彩绘课程  end*/}
                {/*品格教育 start*/}

                <h3>品格教育</h3>
                <div className="caihui">
                    <ul className="specialA">
                        <li>id</li>
                        <li>course</li>
                        <li>txt</li>
                        <li>con</li>
                        <li>src1</li>
                        <li>src2</li>
                        <li>src4</li>
                    </ul>
                    <div className="specialB">
                        {this.state.main_side_r1.map((v,i)=> {
                            return <div className="specialBIn"  key={i}>
                                <ul>
                                    <li>{v.id}</li>
                                    <li><button onClick={this.eduC}>修改</button></li>
                                </ul>
                                <ul>
                                    <li>{v.course}</li>
                                    {/*<li><button>删除</button></li>*/}
                                </ul>
                                <ul>
                                    <li>{v.txt}</li>
                                    {/*<li><button>删除</button></li>*/}
                                </ul>
                                <ul>
                                    <li>{v.con}</li>
                                    {/*<li><button>删除</button></li>*/}
                                </ul>
                                <ul>
                                    <li><img src={v.src1} alt=""/></li>
                                    {/*<li><button>删除</button></li>*/}
                                </ul>
                                <ul>
                                    <li><img src={v.src2} alt=""/></li>
                                    {/*<li><button>删除</button></li>*/}
                                </ul>
                                <ul>
                                    <li><img src={v.src4} alt=""/></li>
                                    {/*<li><button>删除</button></li>*/}
                                </ul>
                                <div className="eduCourse">
                                    <input type="text" placeholder="course"/>
                                    <input type="text" placeholder="txt"/>
                                    <input type="text" placeholder="con"/>
                                    <input type="file" ref="filcc" onChange={this.setimg2.bind(null,this.refs.filcc)} multiple="multiple"/>
                                    <button id="ok2" onClick={this.ok2.bind(this)}>确定</button>
                                </div>
                            </div>


                        })

                        }
                    </div>
                </div>

                {/*品格教育  end*/}
            </div>
        )
    }
}
export default Home
