// const express = require('express');
// const router = express.Router();
// const multer = require('multer')
// const upload = multer({ dest: 'uploads/' })
// const Caver = require('caver-js')
// const caver = new Caver('https://api.baobab.klaytn.net:8651/')
// const fs = require('fs');

// require('dotenv').config()

// router.post('/addAccountFromKeyStore', upload.single('keyStore'), async (req, res, next) => {
//   try {
//     const { file: { filename = "" } = {} } = req;
//     const { body: { password = "" } = {} } = req;
//     if (filename === "" || password === "") throw "인자부족";
//     const keystore = fs.readFileSync(`uploads/${filename}`, 'utf8');
//     console.log(keystore)
//     console.log(req.file)
//     const keyring = await caver.wallet.keyring.decrypt(keystore, password);
//     await caver.wallet.add(keyring)
//     return res.status(200).json(caver.wallet.getKeyring(keyring.address));
//   }
//   catch (error) {
//     console.log("error", error, typeof error);
//     return res.status(400).send({ error });
//   }
// });


module.exports = router;
