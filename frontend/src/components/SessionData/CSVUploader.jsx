import Papa from "papaparse";

const CSVUploader = ({ onDataParsed }) => {
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
                onDataParsed(results.data);
            },
        });
    };

    return (
        <div className="csv-uploader">
            <label htmlFor="csvUpload" className="upload-label">
                Upload CSV File
            </label>
            <input
                type="file"
                id="csvUpload"
                accept=".csv"
                onChange={handleFileUpload}
            />
        </div>
    );
};

export default CSVUploader;
