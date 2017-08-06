
import React,{Component} from 'react';
import $ from 'jquery';

class Garden extends Component{
    constructor() {
        super();
        this.state = {
            banner: [{"src": "", "id": ""}],
            aid: null,
        }
    }
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
            url: "http://192.168.43.5:8005/banner4/ban4img",
            async: true,
            data: fd,
            contentType: false,
            processData: false,
            success: function (e) {
                console.log(666)

                $.ajax({
                    type: "post",
                    url: "http://192.168.43.5:8005/banner4/upban4",
                    data: {"id": this.state.aid},
                    success: function (e) {
                        alert(e)

                    }.bind(this),
                    error: function () {
                        console.log("修改失败")
                    }
                });

            }.bind(this),
            error:function () {
                alert("上传失败")
            }
        })
    }.bind(this);
// banner修改图片完
    componentDidMount() {
        // banner
        $.ajax({
            url: 'http://192.168.43.5:8005/banner4/banner4',
            type: 'get',
            success: function (b) {
                this.setState({
                    banner: b
                })
            }.bind(this)
        });
        var bannerBWrap= document.getElementById('bannerBWrap');
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
        var babyBanner= document.getElementById('babyBanner');
    }
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
            </div>
        )
    }
}

export default Garden;