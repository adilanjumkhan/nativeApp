type Asset = {
  fileSize: number;
  height: number;
  uri: string;
  type: string;
  fileName: string;
  width: number;
};

export type AssetsData = {
  assets: Asset[];
};

export type ImagePickerResponse = {
  assets: Asset[] | undefined;
};
