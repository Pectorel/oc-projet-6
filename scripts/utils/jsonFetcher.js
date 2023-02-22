// eslint-disable-next-line no-unused-vars
class JsonFetcher {

    constructor(path) {

        return new Promise((resolve) => {

            fetch(path)
                .then((res) => {

                res.json()
                    .then((data) => {
                        this.object = data;
                        resolve({"instance": this, "object": this.object});
                });
            });

        });

    }

}