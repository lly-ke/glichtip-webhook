const express = require('express');
const bodyParser = require('body-parser');
const ChatBot = require('dingtalk-robot-sender');
// process.env
const robot = new ChatBot({
  baseUrl: process.env.GW_BASEURL,
  accessToken: process.env.GW_ACCESSTOKEN,
  secret: process.env.GW_SECRET
});

const app = express();
const port = process.env.PORT || 3123;

app.use(bodyParser.json()); // 解析JSON格式的请求体

app.post('/webhook', async (req, res) => {
  try {

    for (item of req.body.attachments) {
      // 发送链接消息到钉钉机器人
      sendLinkToDingTalk(item, req.body.text);
    }

    res.status(200).send('Data received and processed');
  } catch (error) {
    console.error('Error processing the webhook:', error);
    res.status(500).send('Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

async function sendLinkToDingTalk(item, text) {
  try {
    const e = getValue(item.fields, 'Environment')
    let es = e ? `环境: ${e} ` : ''
    const onlyEnv = process.env.GW_ONLY_ENV
    if (onlyEnv && onlyEnv.trim().split(',').indexOf(e) === -1) {
      console.log(`跳过通知 环境:${e}`);
      return
    }
    // getValue(item.fields, 'Project')

    let link = {
      "text": item.title,
      "title": `${es}${item.title}`,
      // "picUrl": "",
      "messageUrl": item.title_link,
    };
    const res = await robot.link(link)
    console.log('Link message sent to DingTalk:', res.data);
  } catch (error) {
    console.error('Failed to send link message to DingTalk:', error);
  }
}

function getValue(fields, title) {
  for (const field of fields) {
    // 如果找到相匹配的title，则返回对应的value
    if (field.title === title) {
      return field.value;
    }
  }
}
