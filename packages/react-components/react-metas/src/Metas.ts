import MetasManager, { TMetaTags } from "@wbe/metas-manager";
import { useEffect } from "react";

type TMetasProps = TMetaTags;

function Metas(props: TMetasProps) {
  useEffect(() => {
    MetasManager.instance.inject(props);
  }, [props]);
  return null;
}

export { Metas, TMetasProps };
