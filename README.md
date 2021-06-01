# Auto-SMS

## 1 Introduction

Auto-SMS is a NodeJS-based tool for sending formatted text messages. What it does is generating an HTML file consisting of links that contain the content of the message as well as the phone number of the person to whom the message is to be sent to. Users of Auto-SMS should open this HTML file __on their smart phone__. You still need to send the messages one by one, but that only requires two clicks each time: click the link in the HTML file, and then click send.

Auto-SMS uses a kind of customized template-like syntax, and for the tool to work, you will be needing a template file and a variable file.

Note: <span style="color: red">Currently, Auto-SMS is only in its beta version. I cannot guarantee that it is the best solution, and sincerely welcome any advice on improving the current project.</span>

## 2 Get Started

As we said, we need a template file and a variable file to get the tool working, and so we will start with those.

### 2.1 Template File

A template should be a .txt file and ought to look like this：

```
{{ name }}您好，您的实验将在{{ day }}的{{ time }}于{{ place }}进行。
```

We wrap the variables in double braces. A legal variable name should consist only of __letters, digits and underscores__. The encoding of the template file should be __utf-8__.

### 2.2 Variable File

The variables should be stored in an excel file (.xlsx) that looks like this:

|  telephone  |     name     | time  | day  |  place  |
| :---------: | :----------: | :---: | :--: | :-----: |
| 11111111111 | participant1 | 17:00 | 1.5  | address |
| 22222222222 | participant2 | 17:05 | 1.5  | address |
| 33333333333 | participant3 | 17:00 | 1.6  | address |
| 44444444444 | participant4 | 17:05 | 1.6  | address |

The contents in the cell must be __strings__! Also, the first column of the table must be the telephone numbers of the receivers. Please __DO NOT__ include any variable that is not present in your template other than the numbers.

### 2.3 Syntax

To use Auto-SMS is simple. You only need the following syntax:

Using sms.exe:

```shell
sms text.txt variable.xlsx
```

Using sms.exe and assigning the name of the output file (which is _out.html_ by default):

```shell
sms text.txt variable.xlsx output.html
```

Using node：

```shell
node sms.js text.txt variable.xlsx
```

Open the generated HTML file on your smart phone, and see it work magic.
