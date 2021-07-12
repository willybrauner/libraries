import React, {
  CSSProperties,
  ReactNode,
  useMemo,
  useRef,
  useState,
} from "react";
import { TImageData } from "./types";

const componentName = "Placeholder";

interface IProps {
  // Image component
  children: ReactNode;

  // by default, ratio is calc from children image data dimension.
  // set ratio override native image ratio
  ratio?: number;

  // shortcut for background color on wrapper
  backgroundColor?: string;

  // add style to each dom element
  style?: {
    root?: CSSProperties;
    wrapper?: CSSProperties;
    img?: CSSProperties;
  };

  // root class name
  className?: string;
}

/**
 * Image Placeholder
 *
 * @desc Add placeholder around Image component
 * @ex
 *
 *    <Placeholder ratio={3/4}>
 *      <Image src={`https://picsum.photos/id/1/360/600`} alt={""}  />
 *    </Placeholder>
 *
 *
 */
export function Placeholder(props: IProps) {
  const rootRef = useRef(null);

  /**
   * Style
   */
  // child image data
  const [childPropsImageData, setChildPropsImageData] = useState<TImageData>();
  // child style
  const [childPropsStyle, setChildPropsStyle] = useState<CSSProperties>();
  const paddingRatio = useMemo((): string => {
    let ratio: number;
    const firstImageData: TImageData = childPropsImageData?.[0];
    // if vertical ratio is set
    if (props.ratio) {
      ratio = props.ratio;
    }
    // else if image as dimensions, calc ratio
    else if (firstImageData?.width && firstImageData?.height) {
      ratio = firstImageData.width / firstImageData.height;
    }

    return ratio ? `${(100 / ratio).toFixed(3)}%` : null;
  }, [childPropsImageData, props.ratio]);

  // prepare dom style
  const style: { [x: string]: CSSProperties } = useMemo(
    () => ({
      root: {
        width: "100%",
        height: "auto",
        ...(props.style?.root || {}),
      },

      wrapper: {
        display: "block",
        position: "relative",
        paddingBottom: paddingRatio,
        backgroundColor: props.backgroundColor,
        ...(props.style?.wrapper || {}),
      },

      img: {
        display: "block",
        position: "absolute",
        top: "0",
        bottom: "0",
        left: "0",
        right: "0",
        width: "100%",
        height: "100%",
        ...(props.style?.img || {}),
        ...(childPropsStyle || {}),
      },
    }),
    [props.style, props.backgroundColor, paddingRatio, childPropsStyle]
  );

  /**
   * Prepare children image render
   */
  const childrenImageRender = useMemo(() => {
    return React.Children.map(props.children, (child: any) => {
      setChildPropsImageData(child?.props?.data);
      setChildPropsStyle(child?.props?.style);
      return React.cloneElement(child, {
        style: style.img,
        className: `${componentName}_image`,
      });
    });
  }, [style]);

  /**
   * Render
   */
  return (
    <div
      className={[componentName, props.className].filter((e) => e).join(" ")}
      style={style.root}
      ref={rootRef}
    >
      <div className={`${componentName}_wrapper`} style={style.wrapper}>
        {childrenImageRender}
      </div>
    </div>
  );
}
