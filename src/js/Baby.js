
import React,{Component} from 'react';
import $ from 'jquery';
import config from './config'

class Garden extends Component {
    constructor() {
        super();
        this.state = {
            banner: [{"src": "", "id": ""}],
            aid: null,

            model: [{"id": "", "txt": ""}],
            model1: [{"id": "", "txt": ""}],
            uid: "",

            park: [{"id": "", "txt": ""}],
            park1: [{"id": "", "txt": ""}],
            pid: "",

            create_con:[{"id":"","txt":""}],
            create_con1:[{"id":"","txt":""}],
            cid:"",

            create_img:[{"id":"","src":""}],
            create_img1:[{"id":"","src":""}],
            imgid:""
        }
    }

    componentDidMount() {

        $.ajax({
            url: config.url+'/banner4/banner4',
            type: 'get',
            success: function (b) {
                this.setState({
                    banner: b
                })
            }.bind(this)
        });
        var bannerBWrap = document.getElementById('bannerBWrap');
        bannerBWrap.onclick = function (e) {
            var ev = e || window.event;
            var target = ev.target || ev.srcElement;
            if (target.innerHTML == "修改") {
                var id = target.parentNode.parentNode.children[0].innerHTML;
                this.setState({
                    aid: id
                });
                $('.upBanner').css('display', 'block');
            }
        }.bind(this);
        //上传图片完
        var babyBanner = document.getElementById('babyBanner');
        // model文字调取开始
        $.ajax({
            url: config.url+'/model',
            type: 'get',
            success: function (b) {
                console.log(b);
                this.setState({model1: b});
            }.bind(this)
        });
        // model文字调取结束
        // {/*.亲子主题乐园文字开始*/}
        $.ajax({
            url: config.url+'/baby_park',
            type: 'get',
            success: function (b) {
                console.log(b);
                this.setState({park1: b});
            }.bind(this)
        });
        // {/*.亲子主题乐园文字完*/}

        // 创造力文字
        $.ajax({
            url:config.url+'/baby_create',
            type:'get',
            success:function(b){
                console.log(b);
                this.setState({create_con1:b});
            }.bind(this)
        });
        // 创造力文字完

        // 照片墙图片
        $.ajax({
            type: "get",
            url: config.url+"/baby_img/baby_img",
            success: function (e) {
                console.log(e)
                this.setState({create_img1:e});
            }.bind(this)
        });
        // 照片墙图片完
    }

    //model文字修改
//     修改按钮

    // banner修改图片
    setimg = function (element) {
        console.log(element);
        var files = [];
        files = element.files[0];
        var fd = new FormData();  //表单处理数据的方法
        fd.append('uploadedFile', files);
        //用append方法以键值对的方式保存
        console.log(fd);
        $.ajax({
            type: "post",
            url: config.url+"/banner4/ban4img",
            async: true,
            data: fd,
            contentType: false,
            processData: false,
            success: function (e) {
                console.log(666)

                $.ajax({
                    type: "post",
                    url: config.url+"/banner4/upban4",
                    data: {"id": this.state.aid},
                    success: function (e) {
                        alert(e)
                    }
                })
            }
        })
    }

    modelClick = function (event) {
        $(".listCourse").css("display", "block");
        var aa = event.target;
        var id = aa.parentElement.parentElement.firstElementChild.innerHTML;
        this.setState({
            uid: id,
        })
    }.bind(this)
    // 确定按钮    学校环境文字修改
    confirmfn() {
        $(".listCourse").css("display", "none");
        var txt = $(".listCourse input:nth-of-type(1)").val();


        if (txt == "") {
            alert("不能为空")
        } else {
            $.ajax({
                type: "post",
                url: config.url+"/model/babyModel",
                data: {
                    id: this.state.uid,
                    txt: txt,
                },
                success: (e)=> {
                    this.setState({
                        model: e
                    })
                },
                error: function () {
                    console.log("失败")
                }
            });
        }
    }

//model文字修改完

    //park文字修改
//     修改按钮
    parkClick = function (event) {
        $(".listCourse1").css("display", "block");
        var aa = event.target;
        var id = aa.parentElement.parentElement.firstElementChild.innerHTML;
        this.setState({
            pid: id,
        })
    }.bind(this)
    // 确定按钮    学校环境文字修改
    confirmfn1() {
        $(".listCourse1").css("display", "none");
        var txt = $(".listCourse1 input:nth-of-type(1)").val();
        if (txt == "") {
            alert("不能为空")
        } else {
            $.ajax({
                type: "post",
                url: config.url+"/baby_park/parkModel",
                data: {
                    id: this.state.pid,
                    txt: txt,
                },
                success: (e)=> {
                    this.setState({
                        park: e
                    })
                },
                error: function () {
                    console.log("失败")
                }
            });
        }

    }
    // 创造力
    //     修改按钮
    createClick = function (event) {
        $(".listCourse2").css("display", "block");
        var aa = event.target;
        var id = aa.parentElement.parentElement.firstElementChild.innerHTML;
        this.setState({
            cid: id,
        })
    }.bind(this)
    // 确定按钮
    confirmfn2() {
        $(".listCourse2").css("display", "none");
        var txt = $(".listCourse2 input:nth-of-type(1)").val();
        if (txt == "") {
            alert("不能为空")
        } else {
            $.ajax({
                type: "post",
                url: config.url+"/baby_create/baby_createTxt",
                data: {
                    id: this.state.cid,
                    txt: txt,
                },
                success: (e)=> {
                    this.setState({
                        create_con: e
                    })
                },
                error: function () {
                    console.log("失败")
                }
            });
        }

    }
    // 创造力完
//park文字修改完

    //照片墙图片修改
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
            url: config.url+"/conB_img/baby_createImg",
            async: true,
            data: fd,
            contentType: false,
            processData: false,
            success: function (e) {
                $.ajax({
                    type: "post",
                    url: config.url+"/conB_img/baby_createImgUp",
                    data: {"id": this.state.imgid},
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

    picDClick=function(event) {
        $(".updateBox1").css("display", "block");
        var dd = event.target;
        var id = dd.parentElement.parentElement.firstElementChild.innerHTML;
        console.log(id)
        this.setState({
            imgid: id,
        })
    }.bind(this);
    // 照片墙图片修改完

// banner修改图片完
    render() {
        return (
            <div className="gardenWrap">
                {/*栏目*/}
                <h3>banner图片</h3>
                <ul className="bannerB">
                    <li>id</li>
                    <li>img</li>
                </ul>
                {/*栏目完*/}
                {/*banner*/}
                <div id="bannerBWrap">
                    {this.state.banner.map(function (v, i) {
                        return <ul key={i} className="bannerB">
                            <li>{v.id}</li>
                            <li><img src={v.src}/></li>
                            <li>
                                <button id="babyBanner">修改</button>
                            </li>
                            <div className="upBanner">
                                <input type="file" ref="filaa1" onChange={this.setimg.bind(null, this.refs.filaa1)}/>
                            </div>
                        </ul>
                    }.bind(this))}
                </div>
                {/*banner完*/}


                <div className="BabyWrap">
                    {/*.model开始*/}
                    <div className="modelWrap">
                        <h3>小孩文字</h3>
                        <ul>
                            <li>id</li>
                            <li>txt</li>
                        </ul>
                        {this.state.model1.map((con, i)=> {
                            return <ul key={i}>
                                <li>{con.id}</li>
                                <li>{con.txt}</li>
                                <li>
                                    <button onClick={this.modelClick}>修改</button>
                                </li>
                            </ul>
                        })}
                        <div className="listCourse">
                            <input type="text" placeholder="txt"/>
                            <button id="confirm" onClick={this.confirmfn.bind(this)}>确定</button>
                        </div>
                    </div>
                    {/*model结束*/}
                    {/*.亲子主题乐园文字开始*/}
                    <div className="parkWrap">
                        <h3>亲子主题乐园文字</h3>
                        <ul>
                            <li>id</li>
                            <li>txt</li>
                        </ul>
                        {this.state.park1.map((con, i)=> {
                            return <ul key={i}>
                                <li>{con.id}</li>
                                <li>{con.txt}</li>
                                <li>
                                    <button onClick={this.parkClick}>修改</button>
                                </li>
                            </ul>
                        })}
                        <div className="listCourse1">
                            <input type="text" placeholder="txt"/>
                            <button id="confirm1" onClick={this.confirmfn1.bind(this)}>确定</button>
                        </div>
                    </div>
                    {/*亲子主题乐园文字结束*/}

                    {/*创造力文字*/}
                    <div className="babyCreate">
                        <h3>创造力文字</h3>
                        <ul>
                            <li>id</li>
                            <li>txt</li>
                        </ul>
                        {this.state.create_con1.map((con, i)=> {
                            return <ul key={i}>
                                <li>{con.id}</li>
                                <li>{con.txt}</li>
                                <li>
                                    <button onClick={this.createClick}>修改</button>
                                </li>
                            </ul>
                        })}
                        <div className="listCourse2">
                            <input type="text" placeholder="txt"/>
                            <button id="confirm2" onClick={this.confirmfn2.bind(this)}>确定</button>
                        </div>
                    </div>
                    {/*创造力文字完*/}

                    {/*照片墙*/}
                    <div id="pictureDWrap">
                        <h3>照片墙</h3>
                        <ul className="pictureDTitle">
                            <li>id</li>
                            <li>img</li>
                        </ul>
                        {this.state.create_img1.map(function (v, i) {
                            return <ul key={i} className="pictureD">
                                <li>{v.id}</li>
                                <li><img src={v.src}/></li>
                                <li><button onClick={this.picDClick}>修改</button></li>
                            </ul>
                        }.bind(this))}
                        <div className="updateBox1">
                            <input type="file" ref="filaa1" onChange={this.setimg1.bind(this, this.refs.filaa1)}/>
                        </div>

                    </div>
                    {/*照片墙完*/}
                </div>
            </div>

        )
    }
}
export default Garden;