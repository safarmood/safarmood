import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CSVImportResult } from '@/types/admin';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';

interface CSVUploaderProps {
  table: string;
  onSuccess?: (result: CSVImportResult) => void;
  onError?: (error: Error) => void;
}

const CSVUploader: React.FC<CSVUploaderProps> = ({ table, onSuccess, onError }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<CSVImportResult | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResult(null);
    }
  };

  const parseCSV = async (text: string): Promise<Record<string, any>[]> => {
    const lines = text.split('\n');
    const headers = lines[0].split(',').map(header => header.trim());
    
    const records: Record<string, any>[] = [];
    
    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;
      
      const values = lines[i].split(',').map(value => value.trim());
      const record: Record<string, any> = {};
      
      for (let j = 0; j < headers.length; j++) {
        // Handle arrays stored as strings like "[value1,value2]"
        if (values[j]?.startsWith('[') && values[j]?.endsWith(']')) {
          record[headers[j]] = values[j]
            .substring(1, values[j].length - 1)
            .split(',')
            .map(item => item.trim());
        } else {
          record[headers[j]] = values[j];
        }
      }
      
      records.push(record);
    }
    
    return records;
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    const result: CSVImportResult = {
      success: 0,
      failed: 0,
      errors: []
    };

    try {
      const text = await file.text();
      const records = await parseCSV(text);
      
      // Process in batches of 10 to avoid timeouts
      const batchSize = 10;
      for (let i = 0; i < records.length; i += batchSize) {
        const batch = records.slice(i, i + batchSize);
        
        const { error } = await supabase
          .from(table)
          .insert(batch);

        if (error) {
          result.failed += batch.length;
          result.errors.push(`Batch ${i/batchSize + 1}: ${error.message}`);
        } else {
          result.success += batch.length;
        }
      }

      setResult(result);
      toast({
        title: 'Import completed',
        description: `Successfully imported ${result.success} records with ${result.failed} failures.`
      });
      
      if (onSuccess) onSuccess(result);
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Unknown error during import');
      setResult({
        success: 0,
        failed: 0,
        errors: [err.message]
      });
      toast({
        variant: 'destructive',
        title: 'Import failed',
        description: err.message
      });
      if (onError) onError(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Input 
          type="file" 
          accept=".csv" 
          onChange={handleFileChange} 
          disabled={uploading}
        />
        <Button 
          onClick={handleUpload} 
          disabled={!file || uploading}
          className="whitespace-nowrap"
        >
          {uploading ? 'Importing...' : 'Import CSV'}
        </Button>
      </div>
      
      {result && (
        <Alert>
          <AlertDescription>
            <div className="space-y-2">
              <p>Import completed: {result.success} successful, {result.failed} failed</p>
              {result.errors.length > 0 && (
                <div className="text-sm text-destructive">
                  <p>Errors:</p>
                  <ul className="list-disc pl-5">
                    {result.errors.map((error, i) => (
                      <li key={i}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default CSVUploader;
