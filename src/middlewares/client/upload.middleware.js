// const Bytescale = require("@bytescale/sdk");
// const nodeFetch = require("node-fetch");
// // const upload = Upload({ apiKey: "free" });
// const uploadManager = new Bytescale.UploadManager({
//   fetchApi: nodeFetch, // import nodeFetch from "node-fetch"; // Only required for Node.js. TypeScript: 'nodeFetch as any' may be necessary.
//   apiKey: "free" // Get API keys from: www.bytescale.com
// });

const Bytescale = require("@bytescale/sdk");

// (async () => {
//   const nodeFetch = await import("node-fetch");

//   const uploadManager = new Bytescale.UploadManager({
//     fetchApi: nodeFetch.default, // Use .default to access the default export
//     apiKey: "free" // Get API keys from: www.bytescale.com
//   });

//   // Your additional code here
// })();

module.exports.upload = async (req, res, next) => {
  // const onFileSelected = async (event) => {
  //   const [ file ]    = event.target.files;
  //   const { fileUrl } = await upload.uploadFile(file, { onProgress });
  //   console.log(`File uploaded: ${fileUrl}`);
  // }

  // const onProgress = ({ progress }) => {
  //   console.log(`File uploading: ${progress}% complete.`)
  // }

  // try {
  //   console.log(req.file)
  //   const { fileUrl } = await upload.uploadFile(
  //     req.file,
  //     { onProgress: ({ progress }) => console.log(`${progress}% complete`) }
  //   );
  //   console.log(`File uploaded: ${fileUrl}`); 
  // } catch (e) {
  //   console.log("error");
  // }

  const nodeFetch = await import("node-fetch");

  const uploadManager = new Bytescale.UploadManager({
    fetchApi: nodeFetch.default, // Use .default to access the default export
    apiKey: "free" // Get API keys from: www.bytescale.com
  });

  uploadManager
  .upload({
    data: req.file.buffer,
    originalFileName: req.file.originalname
  })
  .then(
    ({ fileUrl, filePath }) => {
      console.log(`File uploaded to: ${fileUrl}`);
      req.body[req.file.fieldname] = fileUrl;
      next();
    },
    error => {
      console.error(`Error: ${error.message}`, error);
      return;
    }
  );
};  
