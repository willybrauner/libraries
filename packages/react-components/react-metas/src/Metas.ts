import MetasManager from "@wbe/metas-manager";
import { useEffect } from "react";

type TMetasProps = any;

function Metas(props: TMetasProps) {
  useEffect(() => {
    MetasManager.inject(props);
  }, [props]);
  return null;
}

export { Metas, TMetasProps };
