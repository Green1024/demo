/*
* @Author: 莫问
* @Date:   2017-09-13 13:39:40
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-13 15:31:19
*/

$(function(){

    Game.init( $('#div1') );

});

var gameCount=0;
var Game = {

    gk : [
        {
            map : [
                1,1,2,2,2,1,1,1,
                1,1,2,3,2,1,1,1,
                1,2,2,0,2,2,2,2,
                2,2,2,0,0,0,3,2,
                2,3,0,0,0,2,2,2,
                2,2,2,2,0,2,1,1,
                1,1,1,2,3,2,1,1,
                1,1,1,2,2,2,1,1
            ],
            box : [
                {x : 3 , y : 3},
                {x : 5 , y : 3},
                {x : 3 , y : 4},
                {x : 4 , y : 5}
            ],
            person : { x : 4 , y : 4 }
        },
        //第二关
        {
            map : [
                2,2,2,2,2,1,1,1,1,
                2,0,0,0,2,1,1,1,1,
                2,0,0,0,2,1,2,2,2,
                2,0,0,0,2,1,2,3,2,
                2,2,2,0,2,2,2,3,2,
                1,2,2,0,0,0,0,3,2,
                1,2,0,0,0,2,0,0,2,
                1,2,0,0,0,2,2,2,2,
                1,2,2,2,2,2,1,1,1
            ],
            box : [
                {x : 2 , y : 2},
                {x : 3 , y : 2},
                {x : 2 , y : 3},

            ],
            person : { x : 1 , y : 1 }
        },
        //第三关
        {
            map : [
                1,2,2,2,2,2,2,2,1,1,
                1,2,0,0,0,0,0,2,2,2,
                2,2,0,2,2,2,0,0,0,2,
                2,0,0,0,0,0,0,0,0,2,
                2,0,3,3,2,0,0,0,2,2,
                2,2,3,3,2,0,0,0,2,1,
                1,2,2,2,2,2,2,2,2,1,
                1,1,1,1,1,1,1,1,1,1,
                1,1,1,1,1,1,1,1,1,1,
                1,1,1,1,1,1,1,1,1,1
            ],
            box : [
                {x : 2 , y : 2},
                {x : 6 , y : 3},
                {x : 7 , y : 3},
                {x : 6 , y : 4},

            ],
            person : { x : 4 , y : 3 }
        },
        {
            map : [
                1,1,1,1,2,2,2,2,2,2,2,1,
                1,1,1,1,2,0,0,2,0,0,2,1,
                1,1,1,1,2,0,0,0,0,0,2,1,
                2,2,2,2,2,0,0,2,0,0,2,1,
                3,3,3,2,2,2,0,2,0,0,2,2,
                3,0,0,2,0,0,0,0,2,0,0,2,
                3,0,0,0,0,0,0,0,0,0,0,2,
                3,0,0,2,0,0,0,0,2,0,0,2,
                3,3,0,2,2,2,0,2,0,0,2,2,
                2,2,2,2,2,0,0,0,0,0,2,1,
                1,1,1,1,2,0,0,2,0,0,2,1,
                1,1,1,1,2,2,2,2,2,2,2,1
            ],
            box : [
                {x : 5 , y : 6},
                {x : 6 , y : 3},
                {x : 6 , y : 5},
                {x : 6 , y : 7},
                {x : 6 , y : 9},
                {x : 7 , y : 2},
                {x : 8 , y : 2},
                {x : 9 , y : 6},
            ],
            person : { x : 5 , y : 9 }
        }
    ],

    init : function(oParent){  //初始化
        this.oParent = oParent;
        this.createMap(gameCount);

    },
    createMap : function(iNow){  //创建地图

        this.oParent.empty();

        document.title = '第'+(iNow+1)+'关';

        this.nowJson = this.gk[iNow];
        this.oParent.css('width' , Math.sqrt(this.nowJson.map.length)*50 );
        $.each( this.nowJson.map , $.proxy(function(i,elem){
            this.oParent.append('<div class="pos'+ elem +'"></div>');
        },this) );

        this.createBox();
        this.createPerson();
    },
    createBox : function(){   //创建箱子

        $.each( this.nowJson.box , $.proxy(function(i,elem){

            var oBox = $('<div class="box"></div>');

            oBox.css('left' , elem.x * 50 );
            oBox.css('top' , elem.y * 50 );

            this.oParent.append( oBox );

        },this) );

    },
    createPerson : function(){  //创建人物

        var oP = $('<div class="person"></div>');
        oP.css('left' , this.nowJson.person.x * 50);
        oP.css('top' , this.nowJson.person.y * 50);

        oP.data( 'x' , this.nowJson.person.x );
        oP.data( 'y' , this.nowJson.person.y );

        this.oParent.append( oP );

        this.bindPerson(oP);

    },
    bindPerson : function(oP){  //对人物的操作

        $(document).keydown($.proxy(function(ev){

            switch(ev.which){
                case 37 : //←
                    oP.css('backgroundPosition','-150px 0');
                    this.runPerson(oP,{x : -1});
                break;
                case 38 : //↑
                    oP.css('backgroundPosition','0 0');
                    this.runPerson(oP,{y : -1});
                break;
                case 39 : //→
                    oP.css('backgroundPosition','-50px 0');
                    this.runPerson(oP,{x : 1});
                break;
                case 40 : //↓
                    oP.css('backgroundPosition','-100px 0');
                    this.runPerson(oP,{y : 1});
                break;
            }

        },this));

    },
    runPerson : function(oP,opt){  //人物移动

        var stepX = opt.x || 0;
        var stepY = opt.y || 0;

        if( this.nowJson.map[ (oP.data('y') + stepY )*Math.sqrt(this.nowJson.map.length) + (oP.data('x') + stepX )] != 2 ){

            oP.data('x',oP.data('x') + stepX);
            oP.data('y',oP.data('y') + stepY);

            oP.css( 'left' , oP.data('x')*50 );
            oP.css( 'top' , oP.data('y')*50 );


            $('.box').each($.proxy(function(i,elem){

                if( this.pz( oP , $(elem) ) && this.nowJson.map[ (oP.data('y') + stepY )*Math.sqrt(this.nowJson.map.length) + (oP.data('x') + stepX )] != 2 ){

                    $(elem).css('left' , (oP.data('x') + stepX)*50 );
                    $(elem).css('top' , (oP.data('y') + stepY)*50 );


                    $('.box').each( $.proxy(function(j,elem2){

                        if( this.pz( $(elem) , $(elem2) ) && elem!=elem2 ){

                            $(elem).css('left' , oP.data('x')*50);
                            $(elem).css('top' , oP.data('y')*50 );
                            oP.data('x',oP.data('x') - stepX);
                            oP.data('y',oP.data('y') - stepY);

                            oP.css( 'left' , oP.data('x')*50 );
                            oP.css( 'top' , oP.data('y')*50 );
                        }
                    },this) );


                }
                else if( this.pz( oP , $(elem) ) ){

                    oP.data('x',oP.data('x') - stepX);
                    oP.data('y',oP.data('y') - stepY);

                    oP.css( 'left' , oP.data('x')*50 );
                    oP.css( 'top' , oP.data('y')*50 );

                }

            },this));

        }

        this.nextShow();

    },
    nextShow : function(){   //下一关
        var iNum = 0;
        $('.pos3').each($.proxy(function(i,elem){
            $('.box').each($.proxy(function(j,elem2){
                if( this.pz( $(elem) , $(elem2) ) ){
                    iNum++;
                }

            },this));

        },this));

        if( iNum == $('.box').size() ){
            gameCount++;
            this.createMap(gameCount);
        }

    },
    pz : function(obj1,obj2){  //碰撞检测
        var L1 = obj1.offset().left;
        var R1 = obj1.offset().left + obj1.width();
        var T1 = obj1.offset().top;
        var B1 = obj1.offset().top + obj1.height();

        var L2 = obj2.offset().left;
        var R2 = obj2.offset().left + obj2.width();
        var T2 = obj2.offset().top;
        var B2 = obj2.offset().top + obj2.height();

        if( L1 >= R2 || R1 <= L2 || B1 <= T2 || T1 >= B2 ){
            return false;
        }
        else{
            return true;
        }

    }

};