import React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

// Define the type for the props
interface CommentOutLinedIconProps extends SvgProps {}

const CommentOutLinedIcon: React.FC<CommentOutLinedIconProps> = props => (
  <Svg viewBox="0 0 24 24" {...props}>
    <Path d="M853.333 309.653v106.774H106.667v1043.2l265.35-.098-.07 247.138 329.642-247.138 908.651.098V853.333h106.667l.075 712.862h-979.84L265.35 1920v-353.805H0V309.653h853.333ZM1840.151 0 1920 79.85l-475.482 475.482-282.014-281.901 79.849-79.85 202.165 202.052L1840.15 0Z" />
  </Svg>
);

export default CommentOutLinedIcon;
