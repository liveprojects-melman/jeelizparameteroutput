"use strict";

var _SVGpupilLeft, _SVGpupilRight, _SVGhead;




function move_pupil(SVGpupil, dx, dy){
  JeelizSVGHelper.pos_SVGpath(SVGpupil, dx, dy);
}

function rotate_headZ(rz){
  JeelizSVGHelper.rot_SVGpath(_SVGhead, rz);
}


 function greaterOf(arg1,arg2){
  var result = arg2; 
  if(arg1 > arg2){
    result = arg1;
   }
   return result;
 }

 // returns the difference between the two values
 // we know the values are both conformant to the range  0 - 1
 function normalised_difference(arg1, arg2){
  var result = Math.abs(arg1 - arg2);
  return result;
 }


 function average(arg1, arg2){
  var result = (arg1 + arg2)/2;
  return result;
 }



//entry point :
function main(){
  _SVGpupilLeft=document.getElementById('svgPupilLeft');
  _SVGpupilRight=document.getElementById('svgPupilRight');
  _SVGhead=document.getElementById('svgHead');

    JeelizSVGHelper.init({
         canvasId: 'jeefacetransferCanvas',
     NNCpath: '../../dist/',
     hysteresis: 0.1, //bonus score for already selected expression. Against flickering
     isMirror: true,

     expressions: [ //list of uncorrelated expressions (for example the mouth is uncorrelated with the right eye)
        { //mouth. Inside a group each expression is an exclusive choice
          //the key of an expression is its CSS class. the value is the score class
          //the chosen expression is the one which has the higher score
          /*
          All factors are between 0 and 1. names :
            smileRight -> closed mouth smile right
            smileLeft  -> closed mouth smile left
            eyeBrowLeftDown -> eyebrow left frowned
            eyeBrowRightDown -> eyebrow right frowned
            eyeBrowLeftUp -> eyebrow left up (surprised)
            eyeBrowRightUp -> eyebrow right up (surprised)
            mouthOpen -> mouth open
            mouthRound -> mouth round
            eyeRightClose -> close right eye
            eyeLeftClose  -> close left eye
            mouthNasty   -> mouth nasty (upper lip raised)
          */
          svgMouthRound: function(ks){
             return 0.8*ks.mouthRound-0.1*ks.mouthOpen;
          },

          svgMouthOpen: function(ks){
             return 1.0*ks.mouthOpen;
          },

          svgMouthRest:function(ks){
             return 0.4;
          },

          svgMouthNasty: function(ks){
             return ks.mouthNasty*2.0+0.2*ks.mouthOpen;
          },

          svgSmileLeft: function(ks){
              return ks.smileLeft-ks.smileRight;
          },

          svgSmileRight: function(ks){
              return ks.smileRight-ks.smileLeft;
          },

          svgSmile: function(ks){
             return (ks.smileRight+ks.smileLeft);
          }
        },

        { //left eye
          svgEyeLeftOpen: function(ks){
            return 1.-ks.eyeLeftClose;
          },
          svgEyeLeftClose: function(ks){
            return 1.5*ks.eyeLeftClose;
          }
        },

        { //right eye
          svgEyeRightOpen: function(ks){
            return 1.-ks.eyeRightClose;
          },
          svgEyeRightClose: function(ks){
            return 1.0*ks.eyeRightClose;
          }
        },

        { //left eyebrow
          eyeBrowLeftRest: function(ks){
            return 0.4;
          },
          eyeBrowLeftUp: function(ks){
            return ks.eyeBrowLeftUp;
          },
           eyeBrowLeftDown: function(ks){
            return 1.5*ks.eyeBrowLeftDown;
          }
        },

        { //right eyebrow
          eyeBrowRightRest: function(ks){
            return 0.4;
          },
          eyeBrowRightUp: function(ks){
            return ks.eyeBrowRightUp;
          },
           eyeBrowRightDown: function(ks){
            return 1.5*ks.eyeBrowRightDown;
          }
        }
     ], //end expressions[]




     rotationCallback: function(xyz){
        var rx=xyz[0]; //head angle : rotation around X (look up/down)
        var ry=xyz[1];//rotation around Y : look right/left
        var rz=xyz[2]; //rotation around Z : head bending

        var container = JeelizSVGHelper._output.data;


        container.rx = rx;
        container.ry = ry;
        container.rz = rz;

        container.head_cocked = Math.abs(rz);
        container.any_eyes_closed = greaterOf(container.eyeLeftClose, container.eyeRightClose);
        container.any_eyebrows_up = greaterOf(container.eyeBrowLeftUp, container.eyeBrowRightUp);
        container.any_eyebrows_down = greaterOf(container.eyeBrowLeftDown, container.eyeBrowRightDown);

        container.both_eyes_closed = average(container.eyeLeftClose, container.eyeRightClose);
        container.both_eyebrows_up = average(container.eyeBrowLeftUp, container.eyeBrowRightUp);
        container.both_eyebrows_down = average(container.eyeBrowLeftDown, container.eyeBrowRightDown);
        container.smile = average(container.smileLeft, container.smileRight);

        container.lopsided_smile = normalised_difference(container.smileLeft, container.smileRight);
        container.cocked_eybrow = normalised_difference(container.eyeBrowLeftUp, container.eyeBrowRightUp);
        container.wink = normalised_difference(container.eyeLeftClose, container.eyeRightClose);


        JeelizSVGHelper._output.do_output();

        var dx=12*ry, dy=-5+20*rx;
        move_pupil(_SVGpupilRight, dx,dy);
        move_pupil(_SVGpupilLeft, dx,dy);
        
        rotate_headZ(-rz*150);    
     }

    });
} //end main()
