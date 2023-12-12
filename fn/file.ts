import fs from "fs";

function write(fp: string, content: string) {
    if (fs.existsSync(fp)) {
        fs.rmSync(fp);
    }
    fs.writeFileSync(fp, content);
}

const fnFile = {
    write,
};

export default fnFile;
